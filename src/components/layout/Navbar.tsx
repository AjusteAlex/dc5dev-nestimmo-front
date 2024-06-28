import Link from "next/link";
import DrawerPost from "../post/DrawerPost";
import DrawerCategory from "../category/DrawerCategory";

const Navbar = () => {
    return ( 
        <nav className="flex justify-between p-5">
            <Link href="/">Post list</Link>
            <Link href="/category">Category list</Link>
            <DrawerPost />
            <DrawerCategory />
        </nav>
    );
}

export default Navbar;

