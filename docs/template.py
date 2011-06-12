import glob
import codecs

from jinja2 import FileSystemLoader, Environment
from pygments import highlight
from pygments.lexers import JavascriptLexer, HtmlLexer
from pygments.formatters import HtmlFormatter



for snippet in glob.glob("snippet_*.js"):
    snippet_html = snippet.replace("js", "html")
    codecs.open(snippet_html, "w", "utf8").write(highlight(open(snippet).read(),
                                                 JavascriptLexer(),
                                                 HtmlFormatter()))
    print "wrote snippet", snippet_html

for snippet in glob.glob("snippet_*.src.html"):
    snippet_html = snippet.replace(".src.html", ".html")
    codecs.open(snippet_html, "w", "utf8").write(highlight(open(snippet).read(),
                                                 HtmlLexer(),
                                                 HtmlFormatter()))
    print "wrote snippet", snippet_html


loader = FileSystemLoader('.')
env = Environment(loader=loader)
template = env.get_template("index.src.html")
out = template.render()
print "writing index template"
codecs.open("index.html", "w", "utf8").write(out)
