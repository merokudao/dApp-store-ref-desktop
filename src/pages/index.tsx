import CategoryList from '../pages/categories';
import {Hero, Image, PageLayout} from '../components';

const Index = (props) => {
    return (
        <>
            <Hero
                title="There are more dApps built #OnPolygon than ever before"
                subtitle="The dApps in our ecosystem set the standard for privacy,security and content quality."
                button={{text: 'Submit Your dApp'}}
            />
            <CategoryList title="All dApps" />
        </>
    )
}

export default Index;