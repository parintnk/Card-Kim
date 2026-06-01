import Envelope from "@/components/Envelope";
import { invitation } from "@/data/invitation";

export default function Home() {
  return <Envelope invitation={invitation} />;
}
