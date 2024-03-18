import Image from "next/image";
import Chat from "@/components/Chat";
import { useGlobal } from "@/contexts/Global";
import UpdateProfile from "@/components/Modals/UpdateProfile";
import Button from "@/components/Button";

export default function Home() {
  const { user, updateProfileVis, setUpdateProfileVis } = useGlobal();
  return (
    <main  className={`bg-slate-900 flex min-h-screen flex-col items-center justify-between p-12 w-full `}>
      {/** If user is connected we show the update profile CTA */}
      {user &&
        <div className="flex w-full md:w-1/2 justify-end">
          <Button onClick={() => setUpdateProfileVis(true)} title="Update profile" />
        </div>
      }

      {/** Display the chat component */}
      <div className="flex flex-col flex-1 overflow-y-scroll w-full md:w-1/2 h-full border border-slate-700 rounded-lg shadow mt-2">
          <Chat context="kjzl6kcym7w8y8jar6uyr7r83h72lfaq39f9k9cqjcr7tehlg9gbdxabzrhwr8e" />
      </div>

      {/** Update profile modal */}
      {updateProfileVis &&
        <UpdateProfile hide={() => setUpdateProfileVis(false)} />
      }
    </main>
  );
}
