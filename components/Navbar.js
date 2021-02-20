import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {Icon} from 'semantic-ui-react';
const Navbar = (props) => {
    
    return (
        <Menu className="navigation" fluid stackable>
            <Menu.Item>
                <Link href="/"><a><Icon size="large" name='hacker news' /></a></Link>
            </Menu.Item>

            <Menu.Item header>
                <Link href="/"><a>Hacker News</a></Link>
            </Menu.Item>

            <Menu.Item name='new' active={props.active == "new" ? true : false}>
                <Link href="/"><a>New</a></Link>
            </Menu.Item>

            <Menu.Item name='ask' active={props.active == "ask" ? true : false}>
                <Link href="/ask"><a>Ask</a></Link>
            </Menu.Item>

            <Menu.Item name='show' active={props.active == "show" ? true : false}>
                <Link href="/show"><a>Show</a></Link>
            </Menu.Item>

            <Menu.Item name='job' active={props.active == "job" ? true : false}>
                <Link href="/job"><a>Job</a></Link>
            </Menu.Item>
        </Menu>
    )
}
export default Navbar;