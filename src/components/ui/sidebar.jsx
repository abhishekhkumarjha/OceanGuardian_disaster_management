export function SidebarProvider({ children }) { return children; }
export function Sidebar({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarContent({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarGroup({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarGroupContent({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarGroupLabel({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarMenu({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarMenuButton({ children, className, asChild, ...rest }) {
	if (asChild) return children;
	return <button className={className} {...rest}>{children}</button>;
}
export function SidebarMenuItem({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarHeader({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarFooter({ children, className }) { return <div className={className}>{children}</div>; }
export function SidebarTrigger({ children, className, ...rest }) { return <button className={className} {...rest}>{children}</button>; }