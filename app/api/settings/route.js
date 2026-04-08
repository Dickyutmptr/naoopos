import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config.json');

function getSettings() {
    try {
        if (!fs.existsSync(configPath)) {
            const defaultSettings = { member: 5, owner: 100 };
            fs.writeFileSync(configPath, JSON.stringify(defaultSettings, null, 2));
            return defaultSettings;
        }
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading settings", err);
        return { member: 5, owner: 100 };
    }
}

export async function GET() {
    return NextResponse.json(getSettings());
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { member, owner } = body;
        
        const currentSettings = getSettings();
        
        const newSettings = {
            ...currentSettings,
            member: member !== undefined ? parseFloat(member) : currentSettings.member,
            owner: owner !== undefined ? parseFloat(owner) : currentSettings.owner
        };

        fs.writeFileSync(configPath, JSON.stringify(newSettings, null, 2));
        return NextResponse.json(newSettings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
