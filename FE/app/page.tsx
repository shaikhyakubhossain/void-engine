import { JSX } from "react/jsx-runtime";
import Sidebar from "@/components/Sidebar";

export default function Home(): JSX.Element {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Sidebar />
        </main>
    );
}