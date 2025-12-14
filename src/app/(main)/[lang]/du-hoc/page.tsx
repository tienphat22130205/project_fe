import {
    DuHocHeader,
    DuHocHeroBanner,
    DuHocDestinations,
    DuHocMain,
    DuHocFooter,
} from "../../../../features";

export default function Page() {
    return (
        <>
            <DuHocHeader />
            <DuHocHeroBanner />
            <DuHocDestinations />
            <DuHocMain />
            <DuHocFooter />
        </>
    );
}
