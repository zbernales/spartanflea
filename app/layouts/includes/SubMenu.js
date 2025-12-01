"use client";

export default function SubMenu(){
    {/* Categories */}
    const menuItems = [
        { id: 1, name: 'Home', link: '/' },
        { id: 2, name: 'Saved', link: '/wishlist' },
        { id: 3, name: 'Housing', link: '/categories/housing' },
        { id: 4, name: 'Electronics', link: '/categories/electronics' },
        { id: 5, name: 'Furniture', link: '/categories/furniture' },
        { id: 6, name: 'Fashion', link: '/categories/fashion' },
        { id: 7, name: 'Collectables and Art', link: '/categories/collectables' },
        { id: 8, name: 'Sports', link: '/categories/sports' },
        { id: 9, name: 'Miscellaneous', link: '/categories/miscellaneous' },
        { id: 10, name: 'Sell', link: '/sell' },
    ];

    const handleItemClick = (link) => {
        window.location.href = link;
    };

    return(
        <div id="SubMenu" className ="border-b">
            <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                <ul id="TopMenuLeft" className="flex items-center text-[13px] text-[#333333] px-2 h-8">
                    {menuItems.map(item => (
                        <li key={item.id} className="px-3 hover:underline cursor-pointer" onClick={() => handleItemClick(item.link)}>
                            {item.name}
                        </li>
                    ))}
                </ul>    
            </div>
        </div>
    );
}
