export default function SectionTitle({ title }: { title: string | undefined }) {
    return (
        <h2 className="text-lg text-sky-700">{title}</h2>
    )
}