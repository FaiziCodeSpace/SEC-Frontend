import { CircleAlert } from "lucide-react";
import Cards from "../../components/AdminComponents/Applications/Cards";

export default function Applications() {
    const applications = [
        { _id: '1', pfp: "/pfps/testPfp.png", name: 'Faizan', email: 'Faizanwebdev1@gmail.com', nationId: '12101-08285329', phone: '03140104211', Address: 'Pakistan' },
        { _id: '2', pfp: "/pfps/testPfp.png", name: 'Mikasa Ackerman', email: 'mikasa.a@surveycorps.com', nationId: '44102-12345678', phone: '03001234567', Address: 'Japan' },
        { _id: '3', pfp: "/pfps/testPfp.png", name: 'Eren Yeager', email: 'freedom@yeagerists.com', nationId: '33101-98765432', phone: '03119876543', Address: 'Germany' },
        { _id: '4', pfp: "/pfps/testPfp.png", name: 'Levi Ackerman', email: 'clean.freak@survey.com', nationId: '55105-55555555', phone: '03450001112', Address: 'France' },
        { _id: '5', pfp: "/pfps/testPfp.png", name: 'Armin Arlert', email: 'the.ocean@arlert.net', nationId: '22108-44332211', phone: '03337778889', Address: 'United Kingdom' },
        { _id: '6', pfp: "/pfps/testPfp.png", name: 'Historia Reiss', email: 'queen.h@royal.gov', nationId: '11109-00099911', phone: '03215554433', Address: 'Norway' }
    ];

    return (
        <section>
            <div className="mb-8">
                <h1 className="text-4xl font-normal text-neutral-800 mb-2">Applications</h1>
                <p className="flex gap-2 items-center text-[#6B7280] text-[16px]">
                    <CircleAlert className="text-red-500" size={18} strokeWidth={2.5} />
                    <span>You have <span className="font-semibold text-red-600">2 new applications</span> in last 24h.</span>
                </p>
            </div>
            <Cards applications={applications} />
        </section>
    )
}