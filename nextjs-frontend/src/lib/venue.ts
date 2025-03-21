export const initVenue = (router, host: boolean) => {
    if (host) {
        router.replace("/schedule").then(() => router.reload());
    } else {
        router.replace("/").then(() => router.reload());
    }
}