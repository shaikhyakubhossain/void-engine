import { JSX } from "react/jsx-runtime";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat/Chat";

export default function Home(): JSX.Element {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Sidebar />
            <Chat />
        </main>
    );
}