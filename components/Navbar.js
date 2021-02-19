import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {Icon} from 'semantic-ui-react';
const Navbar = (props) => {
    
    return (
        <Menu fluid stackable>
            <Menu.Item>
                <Icon  size="large" name='hacker news' />
            </Menu.Item>

            <Menu.Item header>Hacker News</Menu.Item>

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