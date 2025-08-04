import React from 'react';

interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: {
    header: string;
    accessorKey: string;
  }[];
}

export const CustomTable: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {columns.map((column, index) => (
              <th 
                key={index}
                className="text-left p-4 font-medium text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className="hover:bg-white/10 transition-colors border-b border-gray-100/10"
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className="p-4"
                >
                  {row[column.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
