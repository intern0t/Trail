import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ListContainer from '../ListContainer/ListContainer';
import Timer from '../Timer';
import { Layout, Icon, Divider } from 'antd';
const { Content, Footer } = Layout;

class MainLayout extends React.Component {
    render = () => (
        <div>
            <Layout>
                <Content style={{ textAlign: 'center', marginTop: '30px' }}>
                    <span mode="inline" style={{ width: '50px' }}>
                        <a href="https://prashant.me/" style={{ padding: '10px 0', fontSize: '30px', marginRight: '10px' }}>Trail</a>
                        <img alt="Icons8 Logo" width="60px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAq5SURBVHhe7VxtcBVXGcYZx1FHxxn/OfrTn+roL3/4gxnHXALSTGmVoq1UW79AR9QOnXG0xEHgJoEQPpoPKWMpUCg4UGihLRUm1JK9+YYQEgIkoUD4MOFTCoFCXPfZfd/k7Lvn3ru791yzzuSZeSY373nf57zvmZvdc86ezbQpTCFZmFGRsXOR3EJDp6GS3GJhennjJ3WazFQ6c49cQ8GIni5QJbmFhk5DJbnFwoxlbV/QaTJTaWuEXEPBiB47n735Hx/ZTm6hYVpPRcly61vQ+NnG4z5ta/COq52qsE6RaygY0YMjqAqAbCe30DCtp8Ip6NfQKN/d79Pe23XN1Xa+MfvINRQK0oODSlUAlO1RaVpP5Wbrsk/7xYPntX5hGUaPhm0C0kEVAGV7VJrWA0srHTo/O4ZGfdq/3dqr9c/HKHruoKmQDqoAyPaG9rFINK3H/OO+YTd+0ZYen27f1Yf27JUt7kCsy9zXxuoYVo/zpmGbADcwVRGQ7brOc9G0HnNefbcbv6Nt2Ke7q/Oqa59X162Ny8awevgM0rBNgBuYqgjIdtlxPprWA5e+e8ONfaymzT597aFPd/H2Prdt8e5L2lgdo+jhM0jDNgFuYKoiINtl5/loWq/eIb4NiH3pnxd9mp1D9+yZVc0u11r3tPGSUfU4bxq2CXADUxUCZXtUmtb7wYud9hnxbUnvO6v1DcOoejRsE5AOqhAo26PStN6OVv+1qv3CqD1rZbPWNwyj6tGwBcEOqhiYNzALjOnZ9seciexexPzu1V57UOj9+fV+V8+ZDO+hiNwwrcdAEKiKgWwnt9AwpefM0RbCf87qNvvoxXs+LSy1ZlY2o9ixkuVNX6GQnDCtNw4uTBUE2U5uoWFCb2ba+qrjOwr/ba3/8ukM3BizF2w6wXrrKCQnTOv5QIE+UZDt5BYaheqVVR75rPNN6IHvn3adCejgzulqpTPnppc3fobCssK03jjcIIVSWLZHZaF6z77UZZ9yVgWqRuv5u/Yjq1q0/vkYVY+GKTtkgCoMyvaoLEQPE9zW8/716cD1MXvhxJ9aJMbRo2HKDhmgioNslxPRfIyr9/yey247phJv99wMxK96+wO3/dGajlBr3rh6sIE0TNnBjkzZAdvVpMIwjh6WVrgLon2zdSUQi/UpFvdYISw/dFOrobIQPc6Thik72JEpO2G7Kh6GUfVWHLrlfEu861DNgXOBuJYP7tqPrm512xe/nn+9W6ge7CANU3awI1N2xHbZQT5G0as6fNt+pLrNtS9x7pBycts7/MB++q/H3PZnN532xepoQg9tIA1TdrAjU+0IlO1RGUXv+df63PmY6t9/bczdq9P556MJPRqm7JABamegbI/KsHqLtvS6xUn/JbvPaP3z0ZQeDVN+cIDsMLIQIZ9eqtr6fCqdOY7Pv3y5OzA3A+sbhzzfCutOaVXmaySthWm9yIAwKDtlO7mFRj49Z8bfgp+Y2OKaJP1eabrs3iGdQXk4ozJTRrJafKei/XMm9WKBC5Mds53cQiOfHvijhqN29+X7AZ+/t4/YpTT9cApeQJJazC5v/7Tj954pvdiAOCg7Zzu5hYZOD9cktmMjU+6GgG92XbdnVXk+qbS1hOS0+H75iU/MqLAOmNKLBS6IKROQ7VHJOlgy4a4I29x17Xbrubu+fsCDfbfs2THWuIXo0TDEhxSUScj2qIQGphLYAcHvj69tt5sGPwz08/7Ah+MT2ygsVI+GIT6koEyE7brJZi5yHCaxS/cMuJ9R0Hv9twN94NuDgYDPMy+fsuvbH2o1QTwM+vlmb9e4ED20gTQM8cFCTJkM22UC+chxlfu9BzRlzp/SIedPSurjuvXE+g7XZ/7GXruuNfvggQu3Dbq+2H4qRA/tIA1DfLAQUybEdl0SuahqoljdTgjumPMbvCXVkw09dm3LA60Wc9FO76yKCT3OjYYhPliIKZNiuy6JXOQ47IbglJPUxVztmQ1drg+ez65v/kirw+RtKVN6nB8NQ3ywEFMmJtujEBPX7eLZA9g38sBdLehictG0HkjDEB9SUCYn26MQSyephyMUcTcHTOuBNAyFgwVlglE6Kqk68nVnYnsL/tjplVqYC/KZk1RFZii1wvoyhWphWq+oQBKgTJLt5JYV311mfdGZ6V+Ar24PDr/Dznp4xEihWkTTs67m0ys6uDA1SZDt5KaFtx61muGHPyfdNhJ2hdGOw4wm9RzeLlmR+SaFTh4omUCibCe3IHBUoiKzEz5P1R+1T1z5KKDBz1zVMycUHUQEvVSFdb8k3fxtipwccEFMmaxsz0asCqyzdwLxr7UNu3dPEJ91sTrm09PFqKTyig/ZsUxYtuuIraL93dcDse/03hz/1vEdVMbqmFOvauJbnItUXvEhO5ZJs11ORKuP3LVnr/IW6397/1IgTl2PrnhzcNxuQm/B1oFAPJP1qbzigztkysTZriaJ9eW8uuOu/YXdwXMmWBX8hJ56YZqhPtgpVO/pjSdzbjawPpVXfHCHTJk829UkF77qLeifqjvqrgJUfwzWc9tOjsfJZxOF6GGJlm+9zPpUXvHBHTLV5EG2c4Llb3lP83Ftazz974A/776Y1itb3W7XNI2Ox2Uj61N5xQd3yJQFyHZmg2ZZtatjJOAnfWQ7M6xeWFJ5xYfsWBYh20E8cx284ffrGBp1T31KX9UHlO1gFL2wdIv7X4I7VosA2V5SkZmJn3Nq2uxjF/1PvnxHxNKZTcXQSzy4MLUQkO3OrP8sfm5rCW4nrX3X2+hMpTN936u2PlUMvcSDC5PFsB38zeaewKL+gDO5xcQXD6zVNalpvcQjX8GznKJwJExtw5Tjh7Xe8wfnG/UXknJhWi+x4IKYakEg26v2B/fjYFNjdZQxbI+rx6T0Jx8yMbUgrD1hw4W+W+yKHHbmbN5xidxrUzXGhB6T0p98yMTUon71incn3HDYP0fDdYvvkot2nMs5oVXjCtFjsi6lP/nghJhc1D/6brm/P76mLbC8wmEdtM1Z05l1aWVaj8m6lP7kgxNiclHPbffWn3WHLviK7XfmaE/WdrptL+wf0RYJmtZjsi6lP/nghJgoCndHrE/LqlvtnmH/tWpr8xXXb25tl3vMQlckaFqPybqU/uSDE2KiKH53YuneAV+xWCHwtyUsTesxKf3Jh0wMLx8/5lyn8PnwGf/BHb5WRaFpPSalnxxwYnuOef9sRv4XH5DvlKm0NZ/CssK0XuLBBfMpdrm9hPN2no91BSdDKSwrTOslHlwwH0rEG4xqwSvfolVCOlNDITlhWi/x4ILBn4o/N+zV8Zm70nTTNygkJ0zrJRZqocxV7/jfLeNJcFzG0aP0kg9d8m90+Z/JrqH9ubiMo0fpJR8ycRxgPCleVOGzd3h9VDe51TGuHsdReskHJ8z88YZjvmKxbsUg4J3a2tbc61SVcfU4jtJLPjhh5h92nvIVjHctYH+i7nig2FyMq8dxlF7ywQkz1x/0L/Y3NXlnk3+xJftxCh3j6nEcpZd8cMJMLK/Ugpe94Z0aiMu4epRe8iETl68P/F45phGHcfUovf8fcOJN4kwe1rCwR32/1rRe4sEFd13yP+Seu947UlZa0fwlcg0F03qJBxecjXipmVxDQaehMqpe4qErUuX08saPk2so6DRURtWbwhSmMIFp0/4LwL8WEK7BoS4AAAAASUVORK5CYII=" />
                    </span>
                </Content>
                <Content style={{ padding: '0 50px', marginTop: '50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sidebar />
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {/* Time */}
                            <Timer />
                            <Divider orientation="left"><Icon type="tags-o" /> Your Recorded Tasks</Divider>
                            <ListContainer />
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center', fontSize: '11px' }}>
                    Made with <Icon type="heart" /> in Virginia, USA. <br /><br />
                    Copyright © 2018, <a target="_blank" rel="noopener noreferrer" href="https://prashant.me">Prashant Shrestha</a>.
    			</Footer>
            </Layout>
        </div>
    )
}

export default MainLayout;
