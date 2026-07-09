import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { queryClient } from "./queryClient";
import store from "../store";

export default function AppProvider({ children }) {
  return (
      <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </Provider>
  );
}


// NOTE: Production apps call this the Provider Pattern.