import { Badge } from "@/components/ui/badge"

interface ExploreHeaderProps {
  student?: any
}

export function ExploreHeader({ student }: ExploreHeaderProps) {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-bold tracking-tight text-violet-900 dark:text-white md:text-4xl">
        Explore Opportunities
      </h1>

      {student && (
        <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-violet-200 dark:border-violet-800">
              <img
                src={student.profileImage || "/placeholder.svg"}
                alt={student.fullName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold text-violet-900 dark:text-white">
                Welcome back, {student.fullName.split(" ")[0]}!
              </h2>
              <p className="text-sm text-violet-600 dark:text-violet-400">
                {student.university} • {student.major} • Class of {student.graduationYear}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:justify-end">
            <Badge
              variant="outline"
              className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
            >
              {student.skills.length} Skills
            </Badge>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              Student
            </Badge>
          </div>
        </div>
      )}

      <p className="mt-4 text-violet-600 dark:text-violet-400">
        Discover job opportunities, projects, and collaborations tailored to your skills and interests.
      </p>
    </div>
  )
}

