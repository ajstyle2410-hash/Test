// src/app/shared/utils/dateFormat.ts
export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
export const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);            
    return date.toLocaleString("en-IN", {       
        year: "numeric",
        month: "short",
        day: "numeric",

        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

};

                                                        
