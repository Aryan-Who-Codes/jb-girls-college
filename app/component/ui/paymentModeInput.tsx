"use client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircle2, Wallet, CreditCard, BanknoteIcon, ScrollText } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

export const paymentModeList = [
  {
    value: "cash",
    label: "Cash Payment",
    icon: BanknoteIcon,
  },
  {
    value: "netbanking",
    label: "Net Banking",
    icon: CreditCard,
  },
  {
    value: "online",
    label: "Online Payment",
    icon: Wallet,
  },
  {
    value: "cheque",
    label: "Cheque",
    icon: ScrollText,
  },
];

const PaymentModeInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const selectedMode = paymentModeList.find(
          (mode) => mode.value.toLowerCase() === value.toLowerCase()
        );

        return (
          <div className="flex group items-center relative h-[52px]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="w-full">
                <button className="flex gap-2 items-center justify-between w-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                    Payment Mode
                  </label>
                  <div className="flex gap-1.5 bg-neutral-100 text-sm pl-2 pr-2.5 rounded-full py-0.5 items-center">
                    {selectedMode && (
                      <selectedMode.icon className="w-4 h-4" />
                    )}
                    <p className="font-medium text-sm">
                      {selectedMode?.label}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 PopoverContent mt-3">
                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                  <CommandInput
                    placeholder="Search payment mode..."
                    className="peer block w-full border-0 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 placeholder:text-neutral-700/40 placeholder:font-medium caret-indigo-500"
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
                      {paymentModeList.map((mode) => (
                        <CommandItem
                          key={mode.value}
                          value={mode.value}
                          onSelect={(currentValue) => {
                            onChange(currentValue);
                            setOpen(false);
                          }}
                          className="w-full cursor-pointer my-2"
                        >
                          <div className="flex gap-2 justify-between items-center w-full">
                            <div className="flex gap-2 items-center">
                              <mode.icon className="w-6 h-6" />
                              <p className="font-medium">{mode.label}</p>
                            </div>
                            <CheckCircle2
                              className={cn(
                                "h-6 w-6 rounded-full",
                                value.toLowerCase() === mode.value.toLowerCase()
                                  ? "opacity-100 bg-indigo-500 text-white"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div
              className={`absolute inset-x-0 bottom-0 border-t border-gray-300 border-dashed ${open ? "border-indigo-500" : "group-hover:border-neutral-400"
                }`}
              aria-hidden="true"
            />
          </div>
        );
      }}
      name="paymentMode"
      defaultValue={getInitialValue("paymentMode", "cash")}
    />
  );
};

export default PaymentModeInput;
