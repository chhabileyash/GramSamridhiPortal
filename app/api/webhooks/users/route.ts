import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/src/index';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    console.log("webhook hit");

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        });
    }

    // Handle the webhook event
    const { id } = evt.data;
    const eventType = evt.type;

    try {
        if (eventType === 'user.created' || eventType === 'user.updated') {
            const { email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;
            const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : '';

            const district = unsafe_metadata?.district as string | undefined;
            const legalAccepted = unsafe_metadata?.legalAccepted as boolean | undefined;
            const phoneNumber = unsafe_metadata?.phoneNumber as string | undefined;
            const role = unsafe_metadata?.role as string | undefined;
            const taluka = unsafe_metadata?.taluka as string | undefined;
            const village = unsafe_metadata?.village as string | undefined;
            const villageId = unsafe_metadata?.village_id as string | undefined;

            if (eventType === 'user.created' && id) {
                await db.insert(users).values({
                    clerkId: id,
                    email: email,
                    firstName: first_name || "",
                    lastName: last_name || "",
                    imageUrl: image_url || "",
                    district,
                    legalAccepted,
                    phoneNumber,
                    role,
                    taluka,
                    village,
                    villageId,
                });
            } else if (eventType === 'user.updated' && id) {
                await db.update(users).set({
                    email: email,
                    firstName: first_name || "",
                    lastName: last_name || "",
                    imageUrl: image_url || "",
                    district,
                    legalAccepted,
                    phoneNumber,
                    role,
                    taluka,
                    village,
                    villageId,
                    updatedAt: new Date(),
                }).where(eq(users.clerkId, id));
            }
        } else if (eventType === 'user.deleted' && id) {
            await db.delete(users).where(eq(users.clerkId, id));
        }
    } catch (error) {
        console.error("Error processing webhook in database:", error);
        return new Response('Database error', { status: 500 });
    }

    return new Response('', { status: 200 });
}
