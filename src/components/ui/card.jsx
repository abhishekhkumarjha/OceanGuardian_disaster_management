export function Card({ children, ...props }) { return <div {...props} className="bg-white rounded-xl shadow p-4 mb-4">{children}</div>; }
export function CardHeader({ children }) { return <div className="mb-2 font-bold">{children}</div>; }
export function CardContent({ children }) { return <div>{children}</div>; }
export function CardTitle({ children }) { return <div className="text-lg font-bold">{children}</div>; }