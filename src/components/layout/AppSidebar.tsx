import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  BarChart2,
  Inbox,
  Package,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  HelpCircle,
  Settings,
} from "lucide-react";

const items = [
  { title: "Home", icon: Home },
  { title: "Dashboard", icon: BarChart2 },
  { title: "Inbox", icon: Inbox },
  { title: "Products", icon: Package },
  { title: "Invoices", icon: FileText },
  { title: "Customers", icon: Users },
  { title: "Chat Room", icon: MessageSquare },
  { title: "Calendar", icon: Calendar, active: true },
  { title: "Help Center", icon: HelpCircle },
  { title: "Settings", icon: Settings },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#42415c]">
        <SidebarGroup className="p-0!">
          <SidebarGroupLabel className="p-0 text-xl font-medium text-white bg-[#3d3c54]">
            IMPEKABLE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-5 p-3">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-white text-lg"
                >
                  <SidebarMenuButton
                    className={`
                      text-white w-full flex items-center gap-2 px-3 py-2 rounded-sm
                      border-l-2 transition-colors
                      ${
                        item.active
                          ? "bg-[#3c3b54] border-white h-15"
                          : "border-transparent hover:bg-[#3c3b54] h-15 hover:border-[#c1c0ed]"
                      }
                    `}
                  >
                    <item.icon className="w-6 h-6 shrink-0" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
