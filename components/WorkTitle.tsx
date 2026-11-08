export default function WorkTitle({ period, position, company }: { period: string, position: string, company: string }) {
    return (
        <div className="">
            <h3 className="text-base">
                <b>{position}</b>, {company}
            </h3>
            <p className="text-sm">{period}</p>
        </div>
    );
}
