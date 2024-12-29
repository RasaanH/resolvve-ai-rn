import { Chat } from "../components/chat";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Index({ navigation }: any) {
  return (
    <AuthProvider>
      <Chat />
    </AuthProvider>
  );
}
