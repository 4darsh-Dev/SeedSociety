import React, { createContext, useContext, useState } from "react";

interface AppContextType {
    selectedTree: Tree | null;
    setSelectedTree: (data: Tree | null) => void;
}
type Tree = {
    locationData: {
      latitude: number;
      longitude: number;
    };
    id: number;
    name: string | null;
    notes: string | null;
    location:string | null;
    images:ImageType[] | null;
    planter:{
      id:number;
      name:string;
      email:string;
    };
    caretakers:Array<number|null> | null;
    plantedAt:any | null,
    species:string |null
  };
  type ImageType = {
    id:number;
    treeId:number;
    imageUrl:string | undefined;
    uploadedAt:any
  }
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedTree, setSelectedTree] = useState<Tree|null>(null);

    return (
        <AppContext.Provider value={{ selectedTree, setSelectedTree }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
