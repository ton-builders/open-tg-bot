"use strict";
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/dist/config";
export default defineWorkersConfig({
    test: {
        poolOptions: {
            workers: {
                wrangler: { configPath: "./wrangler.jsonc" },
            },
        },
    },
});
//# sourceMappingURL=vitest.config.mjs.map