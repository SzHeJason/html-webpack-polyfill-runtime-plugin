import { JsAssets } from '../interface';
export default function getJsFeature(assetsMap: Record<string, JsAssets>): Promise<Record<string, string[]>>;
