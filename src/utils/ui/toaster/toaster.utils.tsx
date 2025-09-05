export function MonsterIcon({ monsterId }: { monsterId: number }) {
    return <img alt={'monster image'} src={`./monsters/${monsterId}.png`} />;
}
