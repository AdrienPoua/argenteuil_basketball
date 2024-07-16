import { HeaderAndFooter } from "@/utils/layouts";

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <HeaderAndFooter>{children}</HeaderAndFooter>
    )
}
