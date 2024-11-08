import { Fragment } from "react";



import { cn } from "../_lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

interface BaseViewProps {
  children: React.ReactNode;
  links?: {
    title: string;
    href: string;
  }[];
  fixedHeight?: boolean;
}

type ViewProps =
  | (BaseViewProps & {
      loading?: false;
      title: string;
    })
  | (BaseViewProps & {
      loading: true;
      title?: undefined;
    });

export function View({
  children,
  links,
  title,
  fixedHeight,
  loading,
}: ViewProps) {
  return (
    <SidebarInset
      className={cn("overflow-x-hidden", {
        "max-h-screen": fixedHeight,
        "overflow-y-hidden": fixedHeight,
      })}
    >
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          {loading && <Skeleton className="h-7 w-[50px]" />}

          {!loading && (
            <Breadcrumb>
              <BreadcrumbList>
                {links?.map((link, index) => (
                  <Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={link.href}>
                        {link.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </Fragment>
                ))}

                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
      </header>

      <div
        className={cn("flex flex-1 flex-col gap-4 p-4 pt-0", {
          "overflow-y-hidden": fixedHeight,
        })}
      >
        {children}
      </div>
    </SidebarInset>
  );
}