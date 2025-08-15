import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableLoading() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </TableHead>
            <TableHead>
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            </TableHead>
            <TableHead>
              <div className="h-6 w-20 animate-pulse rounded bg-muted" />
            </TableHead>
            <TableHead>
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="h-6 w-20 animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
