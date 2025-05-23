interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const Default_Class_Name = "text-2xl font-bold";

const Title = ({ className, children }: TitleProps) => {
  return <h1 className={className ?? Default_Class_Name}>{children}</h1>;
};

export default Title;
