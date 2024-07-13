import Link from "next/link";
import DrawerPost from "../post/DrawerPost";
import DrawerCategory from "../category/DrawerCategory";

const Navbar = () => {
    return ( 
        <nav className="flex gap-4 p-5">
            <Link href="/">Post list</Link>
            <Link href="/category">Category list</Link>
        </nav>
    );
}

export default Navbar;

