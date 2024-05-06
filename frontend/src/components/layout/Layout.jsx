import {Header} from '../header/Header'

// eslint-disable-next-line react/prop-types
export const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <div className="container w-100 overflow-y-auto py-5" style={{height: "calc(100vh-100px)"}} >
                {children}
            </div>
        </div>
    )
}
