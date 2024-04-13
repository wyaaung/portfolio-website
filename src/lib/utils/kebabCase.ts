import { slug } from 'github-slugger';

const kebabCase = (input: string) => slug(input);

export default kebabCase;
