import './Toggle.css';
import Link from 'next/link';

interface ToggleProps {
    link?: string;
    position: React.CSSProperties;
    icon: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ link, position, icon }) => {
    return (
        <div className='toggle-cart'>
            {link ? (
                <Link href={link}>
                    <button style={position} className='props-btn'>
                        {icon}
                    </button>
                </Link>
            ) : (
                <button style={position} className='props-btn'>
                    {icon}
                </button>
            )}
        </div>
    );
}

export default Toggle;
