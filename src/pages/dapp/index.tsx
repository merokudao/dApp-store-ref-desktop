import { useRouter } from "next/router";
import { useSearchByIdQuery } from "../../features/search";
import {Image, ExpandAbleText, PageLayout, Button} from "../../components";
import {AppStrings} from "../constants";

function Divider(props) {
    return <div className="h-[1px] bg-[#2D2C33]" />
}

function SocialButton(props) {
    return <div className="bg-[#212026] p-4 rounded-lg cursor-pointer">
        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5898 2.34187C23.6898 2.80341 22.7898 2.95726 21.7398 3.1111C22.7898 2.49572 23.5398 1.57264 23.8398 0.341872C22.9398 0.957256 21.8898 1.26495 20.6898 1.57264C19.7898 0.649564 18.4398 0.0341797 17.0898 0.0341797C13.9398 0.0341797 11.5398 3.1111 12.2898 6.18803C8.23984 6.03418 4.63984 4.03418 2.08984 0.957257C0.739844 3.26495 1.48984 6.18803 3.58984 7.72649C2.83984 7.72649 2.08984 7.4188 1.33984 7.1111C1.33984 9.4188 2.98984 11.5726 5.23984 12.188C4.48984 12.3419 3.73984 12.4957 2.98984 12.3419C3.58984 14.3419 5.38984 15.8803 7.63984 15.8803C5.83984 17.2649 3.13984 18.0342 0.589844 17.7265C2.83984 19.1111 5.38984 20.0342 8.08984 20.0342C17.2398 20.0342 22.3398 12.188 22.0398 4.95726C23.0898 4.34187 23.9898 3.4188 24.5898 2.34187Z" fill="url(#paint0_linear_119_8829)"/>
            <defs>
                <linearGradient id="paint0_linear_119_8829" x1="12.5898" y1="0.0341797" x2="12.0564" y2="23.9144" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"/>
                    <stop offset="1" stop-color="#D7D7D7"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
}


function DappDetailSection(props) {
    return (
        <section className="my-6">
            {props.title && <h1 className="text-[24px] leading-[32px] font-[500] mb-4">{props.title}</h1>}
            {props.children}
        </section>
    )
}

function DappList(props) {
    const { query } = useRouter();
    const {
        data,
        isFetching,
        isLoading,
    } = useSearchByIdQuery(query.id, {
        page: 1,
        limit: 20,
    }, {
        refetchOnMountOrArgChange: false
    });
    if (isLoading) return <PageLayout>Loading...</PageLayout>
    if (!data) return <PageLayout>Missing post!</PageLayout>

    const dApp = data[0];
    const history = JSON.parse(localStorage.getItem('dApps'));
    localStorage.setItem('dApps', JSON.stringify(Object.assign({}, history, {[dApp.id]: dApp})));

    const router = useRouter();
    return (
        <PageLayout>
            <div className="mb-6 cursor-pointer" onClick={router.back}>
                <svg className="inline-block mr-2" width="24" height="24" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19.5001L5 12.5001M5 12.5001L12 5.50012M5 12.5001H19" stroke="#E2E1E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-2xl">{AppStrings.allDapps}</span>
            </div>
            {dApp.images.banner && <div className="z-0 relative bottom-[-48px]">
                <img src={dApp.images.banner} alt="DApp Banner" className="rounded-lg" />
            </div>}
            <header className="z-10 relative flex flex-col md:flex-row items-end gap-4 mb-12">
                <div className="flex-initial w-[132px]  rounded-lg">
                    <Image width={132} height={132} style={{ aspectRatio: 1 }} src={dApp.images.logo} className="rounded-lg" alt="" />
                </div>
                <div className="flex-auto  pt-4">
                    <p className="text-[16px] leading-[20px] uppercase my-2">{dApp.category}</p>
                    <p className="text-[32px] leading-[38px] font-[600]">{dApp.name}</p>
                </div>
                <div className="flex-initial flex">
                    <Button target="_blank"
                       href={`https://api-a.meroku.store/o/view/${dApp.id}?dappId=${dApp.id}&userId=""&userAddress=""`}>
                        <div className="text-[14px] leading-[16px] font-[500]">Visit Dapp</div>
                        <svg className="mx-2" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7V17M17 7H7" stroke="#E2E1E6" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </Button>
                    <a className="p-4 font-[600] text-[14px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59003 13.51L15.42 17.49M15.41 6.51001L8.59003 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="#E2E1E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                    <a className="p-4 font-[600] text-[14px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15V3M12 15L7 10M12 15L17 10M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#525059" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </a>
                </div>
            </header>
            <DappDetailSection title={AppStrings.about}>
                <ExpandAbleText maxLines={3}>{dApp.description.split('\\n').map(e => <p>{e}</p>)}</ExpandAbleText>
            </DappDetailSection>
            <Divider />
            {dApp.images.screenshots?.length && (<>
                <DappDetailSection title={AppStrings.gallery}>
                    <div className="grid grid-cols-3 gap-4">
                        {dApp.images.screenshots?.map((e) => <img src={e || ''} alt="DApp Screenshots"/>)}
                    </div>
                </DappDetailSection>
                <Divider />
            </>)
            }
            <DappDetailSection>
                <div className="flex justify-between items-center">
                    <p className="text-2xl ">{AppStrings.social}</p>
                    <div className="flex gap-3">
                        <SocialButton />
                        <SocialButton />
                        <SocialButton />
                    </div>
                </div>
            </DappDetailSection>
        </PageLayout>
    );
}

export default DappList;