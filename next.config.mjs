/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:'blogs-23vc.onrender.com',
            protocol:'https',
        },{
            hostname:'cdni.iconscout.com',
            protocol:'https'
        }]
    }
};

export default nextConfig;
