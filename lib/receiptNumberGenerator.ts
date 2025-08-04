class ReceiptNumberGenerator {
  private static instance: ReceiptNumberGenerator;

  private constructor() {}

  public static getInstance(): ReceiptNumberGenerator {
    if (!ReceiptNumberGenerator.instance) {
      ReceiptNumberGenerator.instance = new ReceiptNumberGenerator();
    }
    return ReceiptNumberGenerator.instance;
  }

  public async generateReceiptNumber(date: Date = new Date()): Promise<string> {
    // Only run on server side
    if (typeof window !== 'undefined') {
      // Client side - generate a temporary receipt number
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      return `TEMP-${timestamp}-${random}`;
    }

    try {
      // Dynamic import to avoid client-side execution
      const { connectToDatabase } = await import('@/lib/database/mongoose');
      const Terms = (await import('@/lib/database/models/terms.model')).default;
      
      await connectToDatabase();
      
      // Create date string for receipt number (YYYYMMDD format)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}${month}${day}`;
      
      // Find the highest receipt number for today
      const todayPattern = `RCPT-${dateStr}-`;
      
      const lastReceipt = await Terms.findOne({
        receiptNumber: { $regex: `^${todayPattern}` }
      }).sort({ receiptNumber: -1 }).limit(1);
      
      let nextSequence = 1;
      
      if (lastReceipt && lastReceipt.receiptNumber) {
        // Extract the sequence number from the last receipt
        const sequenceMatch = lastReceipt.receiptNumber.match(/RCPT-\d{8}-(\d{6})$/);
        if (sequenceMatch) {
          nextSequence = parseInt(sequenceMatch[1]) + 1;
        }
      }
      
      // Format sequence number with leading zeros (6 digits)
      const sequenceStr = String(nextSequence).padStart(6, '0');
      
      const receiptNumber = `RCPT-${dateStr}-${sequenceStr}`;
      
      console.log(`Generated receipt number: ${receiptNumber}`);
      return receiptNumber;
      
    } catch (error) {
      console.error('Error generating receipt number:', error);
      // Fallback to timestamp-based number
      const timestamp = Date.now();
      const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
      return `RCPT-${dateStr}-${timestamp.toString().slice(-6)}`;
    }
  }

  public async getNextReceiptNumber(): Promise<string> {
    return this.generateReceiptNumber();
  }
}

export const receiptGenerator = ReceiptNumberGenerator.getInstance();
