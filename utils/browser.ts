// utils/browser.ts

import { chromium, Page } from '@playwright/test';

export async function getDebugPage(): Promise<Page> {

    const browser =
        await chromium.connectOverCDP(
            'http://localhost:9222'
        );

    const context =
        browser.contexts()[0];

    return context.pages()[0];
}