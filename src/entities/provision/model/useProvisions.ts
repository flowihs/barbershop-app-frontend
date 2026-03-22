// import { useState, useEffect } from "react";
// import { provisionService } from "../api/provisionApi";
// import type { Provision } from "./types";

// function useProvisions() {
//     const [provisions, setProvisions] = useState<Provision[]>();
//     const [loading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | undefined>();

//     useEffect(() => {
//         const getAllCall = async () => {
//             try {
//                 setIsLoading(true);
//                 const data = await provisionService.getAll();
//                 setProvisions(data);
        
//             } catch (e) {
//                 if (e instanceof Error) setError(e.message);
//                 else setError("Unknown error");
        
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         getAllCall();
//     }, []);

//     return { error, loading, provisions };
// }

// export { useProvisions };