class ApplicationDecorator < Draper::Decorator
  delegate_all

  def int_formatted(value)
    value = value.round.to_s
    value.gsub(/(\d)(?=(\d\d\d)+(?!\d))/,"\\1,")
  end

  def dollar_formatted(value)
    parts = value.round(2).to_s.split(".")
    parts[0] = parts[0].gsub(/(\d)(?=(\d\d\d)+(?!\d))/,"\\1,")
    parts[1] += "0" * (2 - parts[1].length)
    "$#{parts.join(".")}"
  end

  def int_dollar_formatted(value)
    value = value.round.to_s
    "$#{value.gsub(/(\d)(?=(\d\d\d)+(?!\d))/,"\\1,")}"
  end

end
