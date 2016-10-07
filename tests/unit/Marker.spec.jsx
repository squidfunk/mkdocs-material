
import chai from "chai"

describe("Karma test runner", function() {
  chai.should()

  let sandbox = null

  beforeEach(function() {
    sandbox = (
      <ul class="list">
        {[...Array(10)].map((x, i) => {
          return <li class={`foo-${i + 1}`}>Element {i + 1}</li>
        })}
      </ul>
    )
  })

  it("should compile JSX correctly", function() {
    document.body.appendChild(sandbox)
    return true
  })
})

