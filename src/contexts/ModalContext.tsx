import { X } from 'lucide-react';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Squircle } from 'react-ios-corners';

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
            <Squircle
              radius={40}
              className="relative w-full max-w-lg rounded-t-3xl bg-card-gradient-blue p-6 shadow-lg">
              <button
                onClick={closeModal}
                className="absolute right-2 top-2.5 flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                <div className="flex size-full items-center justify-center rounded-full">
                  <X className="size-5" />
                </div>
              </button>
              {content}
            </Squircle>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
