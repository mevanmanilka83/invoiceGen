"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Invoice, InvoiceItem } from "@/app/types/invoice";
import { initialInvoice } from "@/lib/constant";

interface InvoiceContextType {
  invoice: Invoice;
  updateInvoice: (updates: Partial<Invoice>) => void;
  addItem: (item: InvoiceItem) => void;
  updateItem: (id: string, updates: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;
  calculateTotals: () => void;
  resetInvoice: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);

  const updateInvoice = (updates: Partial<Invoice>) => {
    setInvoice(prev => ({ ...prev, ...updates }));
  };

  const addItem = (item: InvoiceItem) => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, item]
    }));
    calculateTotals();
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => {
      const updatedItems = prev.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      
      const updatedItem = updatedItems.find(item => item.id === id);
      if (updatedItem && (updates.quantity !== undefined || updates.rate !== undefined)) {
        updatedItem.amount = updatedItem.quantity * updatedItem.rate;
      }
      
      return {
        ...prev,
        items: updatedItems
      };
    });
    calculateTotals();
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
    calculateTotals();
  };

  const calculateTotals = () => {
    setInvoice(prev => {
      const subtotal = prev.items.reduce((sum, item) => sum + item.amount, 0);
      const discount = subtotal * 0.1;
      const tax = (subtotal - discount) * 0.105;
      const total = subtotal - discount + tax;

      return {
        ...prev,
        subtotal,
        discount,
        tax,
        total
      };
    });
  };

  const resetInvoice = () => {
    setInvoice(initialInvoice);
  };

  const value: InvoiceContextType = {
    invoice,
    updateInvoice,
    addItem,
    updateItem,
    removeItem,
    calculateTotals,
    resetInvoice
  };

  return React.createElement(InvoiceContext.Provider, { value }, children);
};