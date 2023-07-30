import HomePageSection from "@/components/HomePageSection";

export default function Home() {
  return (
    <main>
      <div className="page_container">
        <HomePageSection
          title="Matrix Calculator"
          link="/matrix"
          description="Get inverse, rref, trace, det, eigen value and vector of a matrix
            and also perform matrix calculations."
          expression="\begin{bmatrix} a & b \newline c & d \end{bmatrix}"
        />
        <HomePageSection
          title="Equation Solver"
          link="/equation-solver"
          description="Get roots and factors of a linear, cubic or polynomial equation."
          expression="ax^2 + bx + c = 0"
        />
        <HomePageSection
          title="2d and 3d Shapes"
          link="/geometry"
          description="Get area, perimeter and diagnol of 2d shapes. And surface area, volume of 3d shapes."
          expression="\triangle"
        />
        <HomePageSection
          title="Simultaneous linear equations"
          link="/equation-solver/simultaneous"
          description="Solve simultaneous linear equations of two, three or four variables."
          expression="ax + by = c"
        />
      </div>
    </main>
  );
}
