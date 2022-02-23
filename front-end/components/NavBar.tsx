import { Layout, Menu} from 'antd';
import Link from 'next/link';
const { Header} = Layout;
import { FC } from 'react';

const NavBar: FC = () => {
    return (
        <div> 
            <Layout>
                <Header className="header">
                <div className="logo" />
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="configure"><Link href={'/configure'}>Configure</Link></Menu.Item>
                    <Menu.Item key="profile"><Link href={'/profile'}>Profile</Link></Menu.Item>
                </Menu>
                </Header>
            </Layout>
        </div>
    );
}

export default NavBar;