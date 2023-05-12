import { createClient } from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url";
import 'react-native-url-polyfill/auto';

const client = createClient({
    projectId: "grqykmy9",
    dataset: "rukuskola-db",
    useCdn: true,
    apiVersion: '2021-10-21', // use a UTC date string
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;