import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSidebar";
import { Calendar } from "./modules/Calendar/component/Calendar";
import { Search, Globe, MessageCircle, Bell, ChevronDown } from "lucide-react";
import avatar from "../src/assets/avatar.jpg";

export const App = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5 w-72">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                className="bg-transparent text-sm outline-none text-gray-500 w-full"
                placeholder="Search transactions, invoices or help"
              />
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-gray-400 cursor-pointer" />
              <MessageCircle className="w-5 h-5 text-gray-400 cursor-pointer" />
              <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-700">John Doe</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  <img src={avatar} alt="avatar" />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gray-100 p-8 flex flex-col items-center">
            <div className="w-full max-w-6xl">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Calendar
              </h1>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Calendar />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
