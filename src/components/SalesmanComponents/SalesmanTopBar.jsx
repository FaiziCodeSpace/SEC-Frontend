import { Bell, Search } from "lucide-react";

export default function SalesmanTopBar(){
    return(
        <section className="sticky bg-white px-4 md:px-14 py-4 md:py-6">
            <div className="flex gap-3 justify-end items-center">
                <Search/>
                <Bell/>
                <p>Meher</p>
                <img src="https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo="
                className="w-10 h-10 object-cover rounded-full border-[2px] border-[#C7F2AB]"
                alt="Profile-Picture" />
            </div>
        </section>
    )
}