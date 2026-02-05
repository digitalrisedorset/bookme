export async function findVenueByCode(
    context,
    venueCode: string
) {
    if (!venueCode) {
        throw new Error("Venue name is required");
    }

    const venues = await context.query.Venue.findMany({
        where: { code: { equals: venueCode } },
        query: 'id name',
    });

    if (venues.length !== 1) {
        throw new Error(`Venue not found or not unique: ${venueCode}`);
    }

    return venues[0];
}
