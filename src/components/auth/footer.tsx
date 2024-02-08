

import { useSession } from 'next-auth/react';
import type { FC } from 'react';

interface FooterDetailsProps { }

const FooterDetails: FC<FooterDetailsProps> = () => {
    const { data: session }: any = useSession();

    if (!session) {
        return <div></div>
    }

    return (
        <div className="flex flex-row justify-between py-2 z-100 bg-blue-400">
            <div></div>
            <div>
                <span className="font-bold text-red-600">F1=</span>
                <span className="text-black font-extrabold">B.Neu</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F2=</span> <span className="text-black font-extrabold">Suche</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F3=</span> <span className="text-black font-extrabold">Anderen</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F4=</span>
                <span className="text-black font-extrabold">R.OK</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F6=</span>
                <span className="text-black font-extrabold">Fahrer</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F7=</span>
                <span className="text-black font-extrabold">R.Neu</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F9=</span>
                <span className="text-black font-extrabold">Druck</span>
            </div>
            <div>
                <span className="font-bold text-red-600">F10=</span> <span className="text-black font-extrabold">Ende</span>
            </div>
            <div></div>
        </div>
    );
}

export default FooterDetails;  
